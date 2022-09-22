const checkPassword = (password: string) => {
    // the checker checks for one uppercase, one lowercase, one digit and between 8 and 30 characters
    const checker = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,30}$/);
    return checker.test(password);
};

export { checkPassword };
