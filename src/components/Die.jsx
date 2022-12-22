

export default function Die(props) {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "",
    }

    return (
        <div style={styles} className="die" onClick={props.toggleIsHeld}>
            <h2>{props.value}</h2>
        </div>
    )
}