interface Props {
    message: string;
}

export default class CustomError extends Error {
    constructor(props: Props) {
        super(props.message)
        // new fields to be added
    }
}