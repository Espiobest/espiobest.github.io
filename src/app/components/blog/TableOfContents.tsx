'use client';

import React, { useEffect, useState } from 'react';
import { Typography, Box, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TableOfContentsItem } from '@/lib/blog';

interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

interface TOCSection {
  h2: TableOfContentsItem;
  h3s: TableOfContentsItem[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [activeId, setActiveId] = useState<string>('');
  const [manuallyExpanded, setManuallyExpanded] = useState<Set<string>>(new Set());

  // Group H3s under their parent H2s
  const sections: TOCSection[] = [];
  let currentSection: TOCSection | null = null;

  items.forEach((item) => {
    if (item.level === 2) {
      currentSection = { h2: item, h3s: [] };
      sections.push(currentSection);
    } else if (item.level === 3 && currentSection) {
      currentSection.h3s.push(item);
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = items
        .map((item) => document.getElementById(item.id))
        .filter((el): el is HTMLElement => el !== null);

      let currentActiveId = '';
      const scrollPosition = window.scrollY + 100;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i];
        if (element.offsetTop <= scrollPosition) {
          currentActiveId = element.id;
          break;
        }
      }

      if (!currentActiveId && headingElements.length > 0) {
        currentActiveId = headingElements[0].id;
      }

      setActiveId(currentActiveId);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleSection = (h2Id: string) => {
    setManuallyExpanded((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(h2Id)) {
        newSet.delete(h2Id);
      } else {
        newSet.add(h2Id);
      }
      return newSet;
    });
  };

  // Determine if a section should be expanded
  const isSectionExpanded = (section: TOCSection) => {
    // Expanded if manually toggled
    if (manuallyExpanded.has(section.h2.id)) {
      return true;
    }
    // Auto-expand if the active item is the H2 or any of its H3s
    if (activeId === section.h2.id) {
      return true;
    }
    return section.h3s.some((h3) => h3.id === activeId);
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <Box className="toc-card">
      <Typography
        variant="h6"
        style={{ marginBottom: '1rem', color: 'white', fontWeight: 600 }}
      >
        Table of Contents
      </Typography>
      <nav>
        {sections.map((section) => {
          const isExpanded = isSectionExpanded(section);
          const hasH3s = section.h3s.length > 0;

          return (
            <Box key={section.h2.id}>
              {/* H2 Link */}
              <Box style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <a
                  href={`#${section.h2.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(section.h2.id);
                  }}
                  className={`toc-link ${activeId === section.h2.id ? 'active' : ''}`}
                  style={{ flex: 1 }}
                >
                  {section.h2.title}
                </a>
                {hasH3s && (
                  <Box
                    onClick={() => toggleSection(section.h2.id)}
                    sx={{
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.25rem',
                      marginLeft: '0.25rem',
                      transition: 'transform 0.2s',
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      '&:hover': {
                        opacity: 0.7,
                      },
                    }}
                  >
                    <ExpandMoreIcon style={{ fontSize: '1.25rem', color: '#9ca3af' }} />
                  </Box>
                )}
              </Box>

              {/* H3 Links - Collapsible */}
              {hasH3s && (
                <Collapse in={isExpanded} timeout="auto">
                  {section.h3s.map((h3) => (
                    <a
                      key={h3.id}
                      href={`#${h3.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick(h3.id);
                      }}
                      className={`toc-link toc-link-h3 ${activeId === h3.id ? 'active' : ''}`}
                    >
                      {h3.title}
                    </a>
                  ))}
                </Collapse>
              )}
            </Box>
          );
        })}
      </nav>
    </Box>
  );
};

export default TableOfContents;
