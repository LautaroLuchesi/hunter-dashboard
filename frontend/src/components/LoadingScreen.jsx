function LoadingScreen({ text = "Generando reporte" }) {

    return (
        <div className="loading-screen">

            <div className="loading-card">

                <div className="loading-logo">
                    HUNTER
                    <span>URUGUAY</span>
                </div>

                <div className="loading-spinner">
                    <div className="loading-spinner-inner"></div>
                </div>

                <h2>{text}</h2>

                <p>
                    Procesando información del día
                </p>

                <div className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

            </div>

        </div>
    );
}

export default LoadingScreen;