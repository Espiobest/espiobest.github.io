import Navbar from "../components/Navbar";
import Image from 'next/image';
import { Container, Typography, Card, CardContent, Button } from '@mui/material';

const Projects = () => {

    const projects = [
        {
            'title': 'RouteAble',
            'description': 'A map-based application that uses crowd-sourced data to help disabled people determine accessible areas',
            'github': 'https://github.com/RouteAble/',
            'link': 'https://docs.google.com/presentation/d/145E9zU8xtpnWF9hRp2KIpmkV4GY5TStbv_fuzdng2to/edit#slide=id.g4dfce81f19_0_45',
            'image': './images/projects/routeable.png',
            'technologies': ['React Native', 'PostgreSQL', 'PyTorch', 'NestJS'],
        },
        {
            'title': 'Routeable',
            'description': 'A map-based application that uses crowd-sourced data to help disabled people determine accessible areas',
            'github': 'https://github.com/RouteAble/',
            'image': './images/projects/routeable.png',
            'technologies': ['React Native', 'PostgreSQL', 'PyTorch', 'NestJS'],
        },
        {
            'title': 'Routeable',
            'description': 'A map-based application that uses crowd-sourced data to help disabled people determine accessible areas',
            'github': 'https://github.com/RouteAble/',
            'image': './images/projects/routeable.png',
            'technologies': ['React Native', 'PostgreSQL', 'PyTorch', 'NestJS'],
        },
        {
            'title': 'Routeable',
            'description': 'A map-based application that uses crowd-sourced data to help disabled people determine accessible areas',
            'github': 'https://github.com/RouteAble/',
            'image': './images/projects/routeable.png',
            'technologies': ['React Native', 'PostgreSQL', 'PyTorch', 'NestJS'],
        }
    ]

    return (
        <div>

            <Navbar mode={'light'} setMode={'idk'}/>

            {/* Pr  ojects Section */}
            <Container style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h5" gutterBottom>
                    My Projects
                </Typography>
                
                <div className="grid grid-cols-2">
                    {projects.map((project, index) => (
                        <Card key={index} style={{ margin: '1rem', maxWidth: '300px', background: 'transparent' }}>
                            <Image src={project.image} alt={project.title} width={300} height={200} />
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {project.title}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {project.description}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Technologies: {project.technologies.join(', ')}
                                </Typography>
                                <Button href={project.github} target="_blank" variant="contained" color="primary">GitHub</Button>
                                {project.link && <Button href={project.link} target="_blank" variant="contained" color="primary">View Project</Button>}
                            </CardContent>
                        </Card>
                    ))}
                </div>

            </Container>


        </div>

    )
};

export default Projects;