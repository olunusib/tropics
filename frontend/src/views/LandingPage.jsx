import World from '../components/3DGlobe'
import CSS from './LandingPage.module.css'


const LandingPage = () => {

    return (

        <div>
            <h1>Welcome To Tropics</h1>

            <div className={CSS.globe_container}>
            <World />
            </div>

        </div>


    )

}


export default LandingPage;


