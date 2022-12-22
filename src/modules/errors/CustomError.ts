interface Props {
    message: string;
    statusCode: number;
    fields: any[];
    description: string;
}

class CustomError extends Error {
    public fields: any[] = []
    public description: string = ""
    public statusCode: number = null

    constructor(props: Props) {
        super(props.message)
        this.fields = props.fields
        this.description = props.description
        this.statusCode = props.statusCode
    }
}

export default CustomError