import React,{useEffect, useState} from 'react';
import './Home.css'
import PlayersList from '../PlayersList';
import NavBar from '../NavBar';
import StatsPage from '../StatsPage';
import HeatmapsPage from '../HeatmapsPage';

const pages = ["Stats","Heatmaps"]


const Home =({getPlayersListApi,getStatsForPlayerApi,getDeathPositionsForPlayerApi,FilePicker}) => {
	const [file,setFile] = useState(false)
	const [loading,setLoading] = useState(false)
	const [playerList,setPlayerList] = useState([])
	const [player,setPlayer] = useState('')
	const [page,setPage] = useState('Stats')
 


	useEffect(()=>{
		if(file){
			const getPlayerList = async()=>{
				const resp = await getPlayersListApi();
				setPlayerList(resp)
				setPlayer(resp[0])
			}
			getPlayerList()
		}
	},[file, getPlayersListApi])



	const selectPlayer=(p)=>()=>{
		console.log(p)
		if (loading || player===p){
			console.log("abort")
			return
		}
		setPlayer(p)
	}

	const selectPage=(p)=>()=>{
		console.log(p)
		if (loading || page===p){
			console.log("abort")
			return
		}
		setPage(p)
	}

	const router = ()=>{
		switch (page){
			case "Stats":
				return <StatsPage player={player} setLoading={setLoading} loading={loading} getStatsForPlayerApi={getStatsForPlayerApi}/>
			case "Heatmaps":
				return <HeatmapsPage player={player} setLoading={setLoading} mapName={file} getDeathPositionsForPlayerApi={getDeathPositionsForPlayerApi}/>
			default:
				return page
		}
	}



	return (
		<div className='home-container'>
			<div className='home-header'>
				{/* <img src={logo} className="logo"/> */}
				GOCS<span className="version">v0.1.0</span>
			</div>
			{!file 
			? <FilePicker setFile={setFile}/>
			: 
			(<div className='home-body'>
				<div className="home-plist-container">
					<PlayersList playersList={playerList} selectPlayer={selectPlayer} selectedPlayer={player}/>
				</div>
				<div className='home-stats-body'>
				<NavBar pages={pages} selectPage={selectPage} selectedPage={page}/>
					{
						router()
					}
				</div>
			</div>)}
		</div>
	);
}

export default Home;
