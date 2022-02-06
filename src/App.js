import React, { useState, useEffect } from 'react'
import { useFetch } from './useFetch'
import Follower from './Follower'
function App() {
  const {loading, data}=useFetch();
  const [page, setPages]=useState(0)
  const [followers,setFollowers]=useState([])

  const handlePage =(index)=>{
    setPages(index)
  }
const Nextpage=()=>{
  setPages((old)=>{
    let nextpage =old +1
    if (nextpage>data.length -1){nextpage=0}
    return nextpage
  })
}
    const prevpage=()=>{
      setPages((oldpage)=>{
        let prevpage=oldpage-1
        if (prevpage<0){prevpage=data.length-1}
        return prevpage
      })
  }
  useEffect(()=>{
    if (loading) return
    setFollowers(data[page])
  },[loading,page])
  return (
    <main>
      <div className='section-title'>
        <h1>{loading? 'Loading...':'pagnition'}</h1>
        <div className='underline'></div>
      </div>
      <section className='followers'>
        <div className='container'>
          {followers.map((follower)=>{
            return <Follower key={follower.id} {...follower} />
          })}
        </div>
        {!loading && (
          <div className='btn-container'>
            <button className='prev-btn' onClick={prevpage}>Prev</button>
            {data.map((item,index)=>{
              return (
                <button key={index} className={`page-btn ${index===page ? 'active-btn':null}`} onClick={()=>handlePage(index)}>{index+1}</button>
              )
            })}
            <button className='next-btn' onClick={Nextpage}>Next</button>
          </div>
        )}
      </section>
    </main>
  )
}

export default App
