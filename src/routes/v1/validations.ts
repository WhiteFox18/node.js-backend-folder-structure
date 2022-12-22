import * as yup from "yup"

const onlyLatinRegex = new RegExp(/^[A-Z0-9]+$/)

export const onlyLatin = (value: string) => {
    return onlyLatinRegex.test(value)
}

export const onlyLatinYup = (field: string) => {
    return {
        message: `body.${field}. use only latin symbols`,
        test: onlyLatin,
    }
}

export const yupArrayOfUuid = (nullable: boolean = true) => {
    return nullable ? yup.array().nullable().of(yup.string().uuid()) : yup.array().of(yup.string().uuid()).required()
}