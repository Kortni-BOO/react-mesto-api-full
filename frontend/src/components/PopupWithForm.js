function PopupWithForm(props) {
    return (
        <div className={`popup popup_${props.name} ${props.isOpen ? "popup_is-opened" : ""}`}>
            <div className={`popup__container popup__container_${props.name}`}>
                <button className={`popup__close popup__close_${props.name}`} onClick={props.onClose}></button>
                <h4 className={`popup__title popup__title_${props.name}`}>
                    {props.title}
                </h4>
                <form className={`popup__form popup__form_${props.name}`} onSubmit={props.onSubmit}>
                    {/*то что сильно отличается */}
                    {props.children}
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;