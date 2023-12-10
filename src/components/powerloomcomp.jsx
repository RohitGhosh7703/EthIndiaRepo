import { useState } from "react"
import axios from "axios"
import Card from "./card"
export default function PowerloomInter(){
    const [projectid, setprojectid ] = useState(null)
    const [epocid, setepocid ] = useState(null)
    const [first , setFirst] = useState(false)
        const [second , setSecond] = useState(false)


        const [third , setThird] = useState(false)

        const [four , setFour] = useState(false)

        const [firstd , setFirstd] = useState(false)
        const [secondd , setSecondd] = useState(false)


        const [thirdd , setThirdd] = useState(false)

        const [fourd , setFourd] = useState(false)
    

    function submitvalue(){
        setepocid(document.getElementById('epocid').value)
        setprojectid(document.getElementById('projectid').value)
        



        axios.get('api/curr_epoch').then((response) => {
            console.log(response);
            console.log('1')
            setFirst(true)
            setFirstd(response.data)
            
          }).catch((error) => {
            
          })

          axios.get('api/epoch_info').then((response) => {
            console.log(response);
            console.log('2')
            setSecond(true)
            setSecondd(response.data)
          }).catch((error) => {
            
          })

          axios.get('api/final_cid').then((response) => {
            console.log(response);
            console.log('3')
            setThird(true)
            setThirdd(response.data)
          }).catch((error) => {
            
          })

          axios.get('api/powerloom').then((response) => {
            console.log(response);
            console.log('4')
            setFour(true)
            setFourd(response.data)
          }).catch((error) => {
            
          })
        }


    

    return(
        <div>
            <div className="flex justify-between w-full px-5 py-5">
            <input id="projectid"   className="p-3  rounded"  type="text" placeholder="Project ID"  value="aggregate_24h_stats_lite:9fb408548a732c85604dacb9c956ffc2538a3b895250741593da630d994b1f27:UNISWAPV2" />
            <input type="text"   className="p-3  rounded"  id="epocid" placeholder="Epoc ID"  value={237} />
            <input type="button"   className="p-3  rounded  bg-slate-700 text-white cursor-pointer" value="Submit"  onClick={submitvalue}/>
            </div>
            {first ? <Card   data={firstd}   title="Current Epoch"/> : ""}
            {second ? <Card  data={secondd}  title="Epoch Info"/> : ""}
            {/* {third ? <Card  data={thirdd}  title="Final Cid"/> : ""} */}
            {four ? <Card  data={fourd}   title="Powerloom"/> : ""}

        </div>


    )
}