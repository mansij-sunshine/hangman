import './ProgressBar.css'

const ProgressBar = ({health}:{health:number})=>{
    const healthpercent = (health/8);
    return (
        <div className="progressbar">
            <span className="filler" style={{width: `${healthpercent*100}%`}}> </span>

        </div>
    )
}

export default ProgressBar