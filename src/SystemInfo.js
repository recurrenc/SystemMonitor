import React, { useEffect, useState } from 'react'
import './system.css'
const os = window.require('os')

const getSystemInfo = () => {
  const info = {
    model: '',
    totalMem: 0,
    memUsed: 0,
    upTime: [],
    clockSpeed: 0,
    avg: 0
  }

  const calculateUptime = () => {
    let result = []
    let upTime = os.uptime()
    result.push(Math.floor(upTime / 3600))
    upTime %= 3600
    result.push(Math.floor(upTime / 60))
    result.push(upTime % 60)
    console.log(result)
    return result
  }

  const cpuAverage = cpus => {
    let total = 0
    let idle = 0
    cpus = cpus || os.cpus()
    cpus.forEach(cpu => {
      for (let type in cpu.times) total += cpu.times[type]
      idle += cpu.times.idle
    })

    return {
      idle: idle / cpus.length,
      total: total / cpus.length
    }
  }
  info.totalMem = (os.totalmem() / 1024 / 1024).toFixed(0)
  info.memUsed = (os.freemem() / 1024 / 1024).toFixed(0)

  let cpus = os.cpus()
  info.model = cpus[0].model
  info.clockSpeed = cpus[0].speed

  let startMeasure = cpuAverage(cpus)

  let endMeasure = cpuAverage()
  let idleDiff = endMeasure.idle - startMeasure.idle
  let totalDiff = endMeasure.total - startMeasure.total
  info.avg = 100 - (idleDiff * 100) / totalDiff

  // console.log(info)
  return info

  // os.cpuUsage(v => {
  //   console.log(v)
  // })

  // const res = {
  //   totalMem: os.totalmem().toFixed(0),
  //   memUsed: os.freemem().toFixed(0)
  // }
  // return res
}

const SystemInfo = () => {
  const [state, setState] = useState({
    model: '',
    totalMem: 0,
    memUsed: 0,
    upTime: [],
    clockSpeed: 0,
    avg: 0
  })
  useEffect(() => {
    setState(getSystemInfo())
  }, [])

  return (
    <div className="main">
      <div className="heading">
        <h2>System Information</h2>
      </div>
      <div className="info">
        <div className="subinfo">
          <div className="body">{state.model} </div>
          <div className="title">
            Total Memory : {`${state.totalMem} / ${state.memUsed} (MB)`}
          </div>
          <div className="body">{state.upTime} </div>
          <div className="body">{state.avg} </div>
        </div>
        {/* <div className="subinfo">
          <div className="title">Memory Uses</div>
          <div className="body">{state.memUsed} MB</div>
        </div> */}
        <div className="subinfo"></div>
        <div className="subinfo"></div>
      </div>
    </div>
  )
}

export default SystemInfo
