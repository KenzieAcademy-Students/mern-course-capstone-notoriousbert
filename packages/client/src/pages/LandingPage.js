import React from 'react'

const Landing = () => {
return (
  <div>
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large"> Kibbles and Ritz</h1>
          <p className="lead">Find pet-friendly hotels, restaurants, and parks all over the US.</p>
          <div className="buttons">
            <a href="/map" className="btn btn-primary">Get Started</a>
          </div>
        </div>
      </div>
    </section>
  </div>
)}

export default Landing