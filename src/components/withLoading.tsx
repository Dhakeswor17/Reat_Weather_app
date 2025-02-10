import { useEffect } from "react"

const withLoading = (ChildComponent: () => JSX.Element, url: string) => {
  return ()=>{
    useEffect(()=>{
        fetch(url)
        .then(result => result.json())
        
    })
    return<ChildComponent/>
  }
}

export default withLoading