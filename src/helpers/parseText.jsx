export const parseText = (string) => {
    string = string.replaceAll('\\n', '\n')
    const text = string.split('\n')        
    return (
        <div>
            {
                text.map((p, index) => (
                    <div key={index}>
                        <p>{p}</p>
                        <br/>
                    </div>
                ))
            }                
        </div>
    )
}