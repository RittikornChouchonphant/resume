import '../styling/home.scss'
// import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
// import { Parallax } from 'react-scroll-parallax'
import { auth, provider } from '../firebase'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Home() {
    const [widthSize, heightSize] = useWindowSize()
    const [prevWidth, setPrevWidth] = useState(50)
    const [parallaxWidth, setParallaxWidth] = useState(60)
    const [prevOpacity, setPrevOpacity] = useState(0.5)
    const [parallaxOpacity, setParallaxOpacity] = useState(1)
    const [isMediaLoaded, setIsMediaLoaded] = useState(null)
    const prevLevel = useRef(0)
    const wheelLevel = useRef(0)
    const prevScrollY = useRef(0)
    const videoEl = useRef(null)
    // const prevWidth = useRef(45)
    // const parallaxWidth = useRef(50)

    const navigate = useNavigate()
    const user = auth.currentUser;
    user && console.log('Currennt User: ', user.displayName)

    document.body.onmousedown = function (e) { if (e.button === 1) return false }

    const attemptPlay = () => {
        videoEl &&
            videoEl.current &&
            videoEl.current.play().catch(error => {
                console.error("Error attempting to play", error);
            });
    }

    const handleGoogleSignin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                console.log(token)
                // The signed-in user info.
                const user = result.user;
                if (user) {
                    navigate('/terms')
                }
                else {
                    alert('Something is wrong, please try again')
                }
            }).catch((error) => alert(error.message));
    }

    // const particlesInit = async (main) => {
    //     console.log(main);
    //     // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    //     // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    //     // starting from v2 you can add only the features you need reducing the bundle size
    //     await loadFull(main);
    // };

    function parallaxHandler(ev) {
        var w = 50 / window.outerWidth
        var h = 50 / window.outerHeight
        var pageX = ev.pageX - (window.outerWidth / 4)
        var pageY = ev.pageY - (window.outerHeight / 4)
        var x = w * pageX * -1
        var y = -500 + h * pageY * -1
        document.getElementById('homemaster').style.backgroundPosition = x + "px " + y + "px"
    }

    function useWindowSize() {
        const [windowSize, setWindowSize] = useState([0, 0])
        useLayoutEffect(() => {
            function updateSize() {
                setWindowSize([window.innerWidth, window.innerHeight])
            }
            window.addEventListener('resize', updateSize)
            updateSize();
            return () => window.removeEventListener('resize', updateSize)
        }, []);
        return windowSize;
    }

    var imageparallax = props => keyframes`
        0% { width: ${props.prevWidth}%; opacity: ${props.prevOpacity}; }
        100% { width: ${props.parallaxWidth}%; opacity: ${props.parallaxOpacity}; }
    `
    var Imgparallax = styled.img`
        opacity: ${parallaxOpacity};
        width: ${parallaxWidth}%;
        animation: ${imageparallax} 0.8s cubic-bezier(.77, 0, .18, 1);
    `

    // const handleWheel = event => {
    //     // var reveals = document.querySelectorAll(".logocard")
    //     // for (var i = 0; i < reveals.length; i++) {
    //     //     if (wheelLevel.current === 8) {
    //     //         reveals[i].classList.add("active")
    //     //     }
    //     //     if (wheelLevel.current < 8) {
    //     //         reveals[i].className = 'logocard'
    //     //     }
    //     // }
    //     if (event.deltaY < 0 && wheelLevel.current > 0) {
    //         wheelLevel.current = wheelLevel.current - 1
    //     }
    //     if (event.deltaY > 0) {
    //         wheelLevel.current = wheelLevel.current + 1
    //     }
    //     if (wheelLevel.current === 1) {
    //         document.getElementById('customnav').classList.add('fade')
    //     }
    //     if (wheelLevel.current === 0) {
    //         document.getElementById('customnav').className = 'customnav'
    //     }
    //     if (wheelLevel.current === 6 && document.getElementById('revealbox')) {
    //         document.getElementById('revealbox').classList.add('active')
    //     }
    //     if (wheelLevel.current < 6) {
    //         document.getElementById('revealbox').className = 'revealbox'
    //     }
    //     if (wheelLevel.current >= 30 && 40 >= wheelLevel.current) {
    //         document.getElementById('homemaster').style.position = 'fixed'
    //         document.getElementById('homemaster').style.top = '-3017px'
    //         if (event.deltaY > 0 && parallaxWidth < 105) {
    //             setPrevWidth(parallaxWidth)
    //             setParallaxWidth(parallaxWidth + 5)
    //             if (parallaxWidth > 90) {
    //                 console.log('downbound')
    //                 document.getElementById('homemaster').style.position = ''
    //             }
    //         }
    //         if (event.deltaY < 0 && 50 < parallaxWidth) {
    //             setPrevWidth(parallaxWidth)
    //             setParallaxWidth(parallaxWidth - 5)
    //             if (parallaxWidth < 65) {
    //                 console.log('upbound')
    //                 document.getElementById('homemaster').style.position = ''
    //                 document.getElementById('homemaster').style.top = '0px'
    //                 wheelLevel.current = 0
    //             }
    //         }
    //         setParallaxMargin((550 - (parallaxWidth * 5)) + 'px')
    //     }
    //     if (wheelLevel.current === 54) {
    //         wheelLevel.current = 0
    //         document.getElementById('homemaster').style.top = '0px'
    //         document.getElementById('homemaster').scrollIntoView({ behavior: "smooth", block: "start" })
    //         setPrevWidth(45)
    //         setParallaxWidth(50)
    //         document.getElementById('customnav').className = 'customnav'
    //     }
    //     console.log(wheelLevel.current + ' | prev: ' + prevWidth + ' | parallax: ' + parallaxWidth + ' | margin: ' + parallaxMargin)
    // }

    useEffect(() => {
        const img = new Image()
        img.src = 'spiral.jpg'
        img.onload = () => setIsMediaLoaded('spiral.jpg')

        attemptPlay()
        onAuthStateChanged(auth, (user) => {
            user ? console.log(user.uid) : console.log('User disappeared :(')
        })

        const handleScroll = () => {
            const currentScrollY = window.scrollY
            if (prevScrollY.current < currentScrollY) {
                // Going down
                if (currentScrollY >= window.innerHeight * 1.9 && parallaxWidth !== 100) {
                    if (Math.floor(currentScrollY / 102) !== prevLevel.current) {
                        setPrevWidth(60)
                        setParallaxWidth(100)
                        setPrevOpacity(1)
                        setParallaxOpacity(0.5)
                    }
                    document.getElementById('pl').className !== 'pl.active' && document.getElementById('pl').classList.add('active')
                    document.getElementById('pr').className !== 'pr.active' && document.getElementById('pr').classList.add('active')
                    document.documentElement.style.setProperty('--parallaxPadding', '0px')
                }
                if (currentScrollY >= window.innerHeight * 2) {
                    document.getElementById('addon').className !== 'parallaxaddon.active' && document.getElementById('addon').classList.add('active')
                }
            }
            if (prevScrollY.current > currentScrollY) {
                // Going up
                if (currentScrollY < window.innerHeight * 1.9 && parallaxWidth === 100) {
                    if (Math.floor(currentScrollY / 102) !== prevLevel.current) {
                        setPrevWidth(100)
                        setParallaxWidth(60)
                        setPrevOpacity(0.5)
                        setParallaxOpacity(1)
                    }
                    document.getElementById('pl').className = 'pl'
                    document.getElementById('pr').className = 'pr'
                    document.documentElement.style.setProperty('--parallaxPadding', '300px')
                }
                if (currentScrollY <= window.innerHeight * 2.2) {
                    document.getElementById('addon').className = 'parallaxaddon'
                }
            }
            prevLevel.current = Math.floor(currentScrollY / 102)
            prevScrollY.current = currentScrollY
            if (Math.floor(currentScrollY / 102) === 1) {
                document.getElementById('customnav').classList.add('fade')
            }
            if (Math.floor(currentScrollY / 102) === 0) {
                document.getElementById('customnav').className = 'customnav'
            }
            if (currentScrollY >= window.innerHeight / 6) {
                document.getElementById('revealbox').className !== 'revealbox.active' && document.getElementById('revealbox').classList.add('active')
            }
            else {
                document.getElementById('revealbox').className = 'revealbox'
            }
            if (currentScrollY >= window.innerHeight * 2.9) {
                document.getElementById('typewriter').className = 'typewriter'
            }
            else {
                document.getElementById('typewriter').className = ''
            }
        }

        document.documentElement.style.setProperty('--scroll-height', window.innerHeight + 'px')
        document.documentElement.style.setProperty('--page-width', window.innerWidth + 'px')

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [parallaxWidth])

    if (widthSize > 1560 && heightSize > 720 && isMediaLoaded) {
        return (
            <div
                className="homemaster"
                id='homemaster'
                onMouseMove={ev => { parallaxHandler(ev) }}
            >
                <div id='customnav' className="customnav">
                    <div style={{ paddingLeft: '10em' }}>
                        <div className='revealnav' style={{ width: '6.4em' }}>
                            <a href='/'>RSTUDIO</a>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div className='revealnav' style={{ marginRight: '5em' }}>
                            <a href='https://drive.google.com/file/d/16sF5a_GWcOBRPuBUFVYcwEYAxGfl5apb/view?usp=sharing' className='fromLeft'>Work</a>
                        </div>
                        <div className='revealnav' style={{ marginRight: '5em' }}>
                            <a onClick={() => {
                                document.getElementById('box') && document.getElementById('box').scrollIntoView({
                                    block: "start",
                                    behavior: "smooth"
                                })
                                wheelLevel.current = 14
                                document.getElementById('revealbox').classList.add('active')
                            }}
                                className='fromLeft'>Experience
                            </a>
                        </div>
                        <div className='revealnav'>
                            <a onClick={handleGoogleSignin} className='fromLeft'>Contact</a>
                        </div>
                    </div>
                </div>
                <div id='spotlight' className='spotlight' style={{ height: window.innerHeight }}>
                    <p>Adaptivity</p>
                    <p>Creativity</p>
                    <p>Flexibility</p>
                </div>
                <div id='box' className='box' style={{ height: window.outerHeight }}>
                    <div className='revealbox' id='revealbox'>
                        <p>Experienced with React, Svelte,</p>
                        <p>NextJS, Firebase and MongoDB</p>
                    </div>
                    <div className='logobox'>
                        <div className='logocard' id='logocard'>
                            <div className='cardimgmaster'>
                                <img
                                    src='https://i.imgur.com/oYiTqum.jpg'
                                    alt='signal'
                                    className='cardimg'
                                />
                            </div>
                            <div className='cardoverlay'>
                                <div className='cardheader'>
                                    <a href='https://signal-sdp.firebaseapp.com/'>SIGNAL</a>
                                </div>
                                <div className='carddesc'>
                                    <p>People gathering platform occuring various type of event created with React and Firebase</p>
                                </div>
                            </div>
                        </div>
                        <div className='logocard' id='logocard'>
                            <div className='cardimgmaster'>
                                <img
                                    src='https://i.imgur.com/oYiTqum.jpg'
                                    alt='know studio'
                                    className='cardimg'
                                />
                            </div>
                            <div className='cardoverlay'>
                                <div className='cardheader'>
                                    <a href='https://cdn.discordapp.com/attachments/731849212274147339/872339146679668737/unknown.png'>KNOW STUDIO</a>
                                </div>
                                <div className='carddesc'>
                                    <p>Most advanced dashboard ever exist powered by NextJS and complex Firebase Auth API</p>
                                </div>
                            </div>
                        </div>
                        <div className='logocard' id='logocard'>
                            <div className='cardimgmaster'>
                                <img
                                    src='https://i.imgur.com/oYiTqum.jpg'
                                    alt='raskit'
                                    className='cardimg'
                                />
                            </div>
                            <div className='cardoverlay'>
                                <div className='cardheader'>
                                    <a href='https://raskit.au.meteorapp.com/'>RASKIT</a>
                                </div>
                                <div className='carddesc'>
                                    <p>UI Prototype with Meteor framework for quiz making platform, additionally packed with MongoDB</p>
                                </div>
                            </div>
                        </div>
                        <div className='logocard' id='logocard'>
                            <div className='cardimgmaster'>
                                <img
                                    src='https://i.imgur.com/oYiTqum.jpg'
                                    alt='rstudio'
                                    className='cardimg'
                                />
                            </div>
                            <div className='cardoverlay'>
                                <div className='cardheader'>
                                    <a href='https://boxworkshop-5b0be.web.app'>RSTUDIO</a>
                                </div>
                                <div className='carddesc'>
                                    <p>React and CSS challange with almost zero library used, blazing fast resume with responsive design</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='box2' id='box2' style={{ height: window.outerHeight }}>
                    <div className='imagemaster'>
                        <Imgparallax
                            id='imageparallax'
                            src='pkmn_wall.png'
                            alt='parallax_background'
                            prevWidth={prevWidth}
                            parallaxWidth={parallaxWidth}
                            prevOpacity={prevOpacity}
                            parallaxOpacity={parallaxOpacity}
                        />
                    </div>
                    <div className='parallaxmaster'>
                        <p className='pl' id='pl'>simpli</p>
                        <p className='pr' id='pr'>city</p>
                    </div>
                    <div className='parallaxaddon' id='addon'>
                        <p>Designed with AdobeXD and Figma</p>
                        <p style={{ marginTop: '0.5em' }}>even it has been bought by Adobe...</p>
                    </div>
                </div>
                <div id='box3' className='box3' style={{ height: window.innerHeight }}>
                    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                        <video
                            style={{ width: '100%', opacity: '0.5' }}
                            controls={false}
                            playsInline
                            loop
                            muted
                            alt='footer'
                            src='footer.webm'
                            ref={videoEl}
                        />
                    </div>
                    <div style={{ position: 'absolute', width: 'wrap-content', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div>
                            <a
                                href='https://drive.google.com/file/d/16sF5a_GWcOBRPuBUFVYcwEYAxGfl5apb/view?usp=sharing'
                                style={{ fontFamily: 'SFProBold', fontSize: '7vw' }}
                            >
                                New world awaits
                            </a>
                        </div>
                        <div id='typewriter' className='typewriter'>
                            <h3>Please contact us at rittikorn2543@gmail.com or 0992474514 for more information.</h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>Mobile version is coming soon!</div>
        )
    }
}

export default Home