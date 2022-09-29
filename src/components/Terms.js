import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Terms() {
    const auth = getAuth();
    const user = auth.currentUser;
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(0)

    function handleLogout() {
        signOut(auth)
            .then(() => {
                console.log('Logout successfully')
                navigate('/')
            })
            .catch(err => alert(err.message))
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            user ? setIsLoggedIn(1) : setIsLoggedIn(2)
        })
    }, [])

    if (isLoggedIn === 0) {
        return (
            <div className="container">
                <h1>Loading...</h1>
            </div>
        )
    }
    if (isLoggedIn === 1) {
        return (
            <div className="container">
                <h1> Terms and Conditions, {user.displayName} </h1>
                <p>Lorem Ipsum, ....</p>
                <button className="action-button" onClick={handleLogout}>Logout</button>
            </div >
        )
    }
    if (isLoggedIn === 2) {
        return (
            <div className="container">
                <h1 onClick={() => { navigate('/') }}> Please login first to see page content </h1>
            </div>
        )
    }
}

export default Terms
