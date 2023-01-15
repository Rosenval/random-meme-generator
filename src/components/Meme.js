import React from "react"

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        rightText: "",
        leftText: "",
        randomImg: "http://i.imgflip.com/1bij.jpg"
    })
    
    const [allMemes, setAllMemes] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
    }, [])

    function getMemeImg() {
        const randomNb = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNb].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImg: url,
            topText: "",
            bottomText: ""
        }))
    }

    function handleChange(event) {
        const {name, value} = event.target

        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return(
        <main>
            <div className="form">
                <input
                    type="text"
                    className="form--input"
                    placeholder="top text"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}

                />
                <input
                    type="text"
                    className="form--input"
                    placeholder="bottom text"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button className="form--button" onClick={getMemeImg}>thank u, next meme</button>
            </div>
            <div className="meme">
                <img src={meme.randomImg} alt="random meme" className="meme--img" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}