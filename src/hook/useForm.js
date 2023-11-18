import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
    
    const [ formState, setFormState ] = useState( initialForm );
    /*Se necesita un hook de react porque si se dispara un error 
    en el formulario necesito redibujar el formulario o si ya 
    no es un error se neecsita que se redibuje todo. */
    const [formValidation, setFormValidation] = useState({});

    /*Cada vez que el formState cambia se va a llamar el
    createValidators*/
    useEffect(() => {
        createValidators();
    
    }, [ formState ])

    /*Esta funcion solo se va a ejecutar si nuestro formState cambia */
    const isFormValid = useMemo( () => {

        for (const formValue of Object.keys( formValidation )) {
            if( formValidation[formValue] !== null ) return  false;
        }
        return true;
    }, [ formValidation ] );
    

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {

        const formCheckedValues = {};
        /*Para barrer cada una de las propiedades del formValidations
        se hace de la siguiente forma (Precaución O mayuscula)*/
        for (const formField of Object.keys( formValidations )) {
            //console.log(formField);
            // se desestructura la función y el mesaje de error. 
            const [ fn, errorMessage ] = formValidations[formField];
            //crea una propiedad computada (emailValid).
            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] )
            ? null
            : errorMessage;
            
        }

        setFormValidation( formCheckedValues );
        //console.log(formCheckedValues);

    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}