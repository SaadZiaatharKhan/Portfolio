export const Menu = () => {
    return (
        <div className="menu">
            {/* <img src="saad_logo.png" alt="logo" className="menu__logo"/> */}
            <div className="menu__buttons">
                <a className="menu__button" href="#home">
                    Home
                </a>
                <a className="menu__button" href="#about">
                    Skills
                </a>
                <a className="menu__button" href="#projects">
                    Projects
                </a>
                <a className="menu__button" href="#contact">
                    Contact
                </a>
            </div>
        </div>
    )
}