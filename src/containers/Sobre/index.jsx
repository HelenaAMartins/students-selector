import React from "react";
import SocialNetwork from "../../components/SocialNetwork";

const About = () => (
  <section className="about">
    <div className="container">
    <h1>Sobre o projeto</h1>
    <p>
      Esse projeto foi desenvolvido sob medida para ajudar minha esposa na escolha dos
        alunos para as atividades semanais durante as aulas online.       
    </p>
    <h2>Sobre o Desenvolvedor</h2>    
    <SocialNetwork />
    </div>
  </section>
);

export default About;
