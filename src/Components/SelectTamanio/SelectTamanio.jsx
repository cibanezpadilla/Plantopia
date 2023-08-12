
import { useEffect } from "react"



const SelectTamanio = ({options, setTamanio, setMultiplier, setStock}) => {

    const handleSelect = (e) => {
        const option = options.find(op => op.value === e.target.value)        
        setTamanio(option.value)
        setMultiplier(option.multiplier)
        setStock(option.stock)
    }

    useEffect(() => {
        const option = options[0]
        setTamanio(option.value)
        setMultiplier(option.multiplier)
        setStock(option.stock)
    }, [])



    
    return (
        <select className="select-wish select-detail" onChange={handleSelect}>
            {
                options.map(opt => <option value={opt.value} key={opt.value}>{opt.value}</option>)
            }
        </select>
    )
}

export default SelectTamanio





