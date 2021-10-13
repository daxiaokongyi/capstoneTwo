const formatErrs = (errMessages) => {
    let formattedErrs = errMessages.map(error => {
        if (error.includes('instance.username')) {
            return 'User Name is required';
        } else if (error.includes('instance.firstName')) {
            return 'First Name is required';
        } else if (error.includes('instance.lastName')) {
            return 'Last Name is required';
        } else if (error.includes('instance.email does not meet minimum length of 6')) {
            return 'Input Email needs to meet minimum length of 6';
        } else if (error.includes('instance.email does not conform to the "email" format')) {
            return 'Input email does conform to the email format' 
        } else if (error.includes('instance.password')) {
            return 'Password does not meet minimum length of 5'
        }
        return '';
    })
    return formattedErrs;
}

export default formatErrs;