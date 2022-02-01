import React from 'react'
import Card from '../components/Card'
import { useNavigate } from "react-router-dom";

const Home = () => {
    let navigate = useNavigate();
    return (
        <div className="page-container">
            <Card cardTitle='create manifest' cardText='Create manifest from bank file' navFunc={() => navigate('/create-manifest')}/>
            <Card cardTitle='create manifest' cardText='Create manifest from items' navFunc={() => navigate('/create-manifest/manifest')}/>
        </div>
    )
}

export default Home
