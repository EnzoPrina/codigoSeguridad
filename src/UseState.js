import React from 'react'

const SECURITY_CODE = 'paradigma';

function UseState({name}) {
    const [state, setState] = React.useState({
        value: '', 
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    })
    console.log(state)

const onConfirm = () => {
    setState({
        ...state,
        error: false,
        loading: false,
        confirmed: true,
    })
}

const onError = () => {
    setState({
        ...state,
        error: true,
        loading: false,
    });
}

const onWrite = (newValue) => {
    setState(
        {
        ...state,
        value: newValue})
}

const onCheck = () => {
    setState({
        ...state,
        loading: true})
}

const onDelete = () => {
    setState({
        ...state,
        deleted: true,
    })
}

const onReset = () => {
    setState({
        ...state,
        confirmed: false,
        deleted: false,
        value: '',
    })
}


React.useEffect(() => {
    console.log("Empezando...")

    if (!!state.loading) {
        setState({...state, error: false,})
        setTimeout(() => { 
            console.log("Haciendo la validacion...")

            if(state.value === SECURITY_CODE) {
                onConfirm();
            }else {
                onError()
            }

            console.log("Terminando la validacion...")
        }, 3000)
    }

    console.log("Acabando...")
}, [state.loading])


if (!state.deleted && !state.confirmed) {
    return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor, escribe el codigo de seguridad. </p>

                {(state.error && !state.loading) && (
                    <p>ERROR: el codigo es incorrecto</p>
                )}

                {state.loading && (
                    <p>Cargando...</p>
                )}

                <input
                placeholder='Codigo de seguridad'
                value={state.value}
                onChange={(event) => {
                    onWrite(event.target.value);
                }}
                />
                <button
                onClick={() => 
                    onCheck()
                    }
                >Comprobar</button>
            </div>

        );
    }else if (!!state.confirmed && !state.deleted) {
        return(
            <React.Fragment>
                <p>Pedimos confirmacion. ¿Estas segurx?</p>
                <button
                onClick={() => {
                    onDelete()
                }}
                >Si, eliminar</button>


                <button
                onClick={() => {
                    onReset()
                }}
                >No, me arrepenti</button>
            </React.Fragment>
        );
    } else {
        return(
            <React.Fragment>
                <p>Eliminado con exito</p>
                <button
                onClick={() => {
                    onReset()
                }}
                >Resetear, volver atras</button>
            </React.Fragment>
        );
    }
}

export {UseState}