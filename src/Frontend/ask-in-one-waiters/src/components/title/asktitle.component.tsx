interface AskTitleProps {
    text: string
}

export default function AskTitle(props: AskTitleProps) {
    return <h1
        style={{
            marginTop: 8,
            marginLeft: 10
        }}
    >{props.text}</h1>
}