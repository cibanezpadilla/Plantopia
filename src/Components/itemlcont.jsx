
useEffect(() => {
    setLoading(true)

    pedirDatos()
        .then(r => {
            if  (categoryId == "all") {
                setProductos(r)
                /* muestro todo */ 
            }
            else if (categoryId) {
                setProductos( r.filter(prod => prod.category === categoryId) )
                /* si categoryId tiene algun valor, busca coincidencia */             
                          
            } else {
                setProductos(r)
            }
        })
        .catch(e => console.log(e))
        .finally(() => {
            setLoading(false)
            /* if( categoryId != undefined)
                setTimeout(()=>{ref.current.scrollIntoView({"behavior":"smooth"});})
            else {
                setTimeout(()=>{window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });})
            }; */
        })
    }, [categoryId])