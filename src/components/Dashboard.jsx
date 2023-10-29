import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'
import axios from 'axios'
import { UserContext } from '../App'

const Dashboard = () => {
    const navigate = useNavigate()

    const { BASE_URL, userAuthToken } = useContext(UserContext)

    const [userNote, setUserNote] = useState({ title: "", note: "" })

    const [editingNote, setEditingNote] = useState(null)

    const [getData, setGetData] = useState([])


    // this for logout button 
    const handleClick = () => {
        navigate('/login')
        localStorage.clear();
    }

    // this is for onChange event in which userNote before and whatever we write it in input is updated "ONCHanGE"
    const handleChange = (e) => {
        setUserNote((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))

    }

    // this for creating new note "CREATE"......
    const fetchAddNote = async () => {
        try {
            const response = await axios.post(BASE_URL + `api/notes`, { ...userNote }, { headers: { Authorization: `Bearer ${userAuthToken}` } })
            setGetData((prev) => [response.data, ...prev])
        } catch (error) {
            console.log(error);
        }
    }



    const handleCreate = (e) => {
        e.preventDefault();
        fetchAddNote()
    }

    // here we get all notes created by particular user's "READ"....
    const fetchNotes = async () => {
        try {
            const response = await axios.get(BASE_URL + `api/notes`,
                {
                    headers: { Authorization: `Bearer ${userAuthToken}` }
                });
            setGetData(response.data)


        } catch (err) {
            console.error(err)
        }
    }

    
    // here we start foe EDIT notes "EDIT"
    const handleEdit = (notes) => {
        setEditingNote(notes)
        setUserNote({
            title: notes.title,
            note: notes.note
        })
    }
    
    // this for cancel button "CANCEL"
    const handleCancel = () =>{
        setEditingNote(null);
        setUserNote({title :"" , note: ""})
    }

    const handleSave =async() =>{
        try {
            const response = await axios.put(BASE_URL +`api/notes/${editingNote._id}`,userNote , {headers :{ Authorization: `Bearer ${userAuthToken}` }})
            
            const updatedNote = getData.map((notes) =>(
                notes._id == response.data._id ? response.data : notes
            ))
            
            setGetData(updatedNote)
            setEditingNote(null) ;
            setUserNote({title: "" , note: ""})
        } catch (error) {
            console.error(error)
        }
    }
    
const handleDelete =async(notesId) =>{
    try {
         await axios.delete(BASE_URL +`api/notes/${notesId}`, {headers : {Authorization: `Bearer ${userAuthToken}`}})
         const updatedDelete = getData.filter((note)=> note._id !== notesId);
         setGetData(updatedDelete)
    } catch (error) {
        console.error(error)
    }
}

    
    useEffect(() => {
        fetchNotes()
    }, [])
    

    return (
        <>
            <header>
                <div>
                    <h2 className="Note-logo">KeEp_ThE_NoTe</h2>
                </div>

                <ul>
                    <li>HOME</li>
                    <li>PROFILE</li>
                    <li>SERVICES</li>
                    <li>CONTACT_US</li>
                </ul>

                <div>
                    <button onClick={handleClick} >Logout</button>
                </div>
            </header>

            {/* here we can create notes of user  */}
            <section>
                <div className="postsection">
                    <div className="box">
                        <div className="note-title">
                            <label className="label"> TITLE : - </label>
                            <input type="text" name="title" value={userNote.title} onChange={handleChange} placeholder="Purpose of Note"></input>
                        </div>
                        <div className="note-area">
                            <label className="label"> NOTE : - </label>
                            <textarea name="note" value={userNote.note} onChange={handleChange}></textarea>
                        </div>
                    </div>
                    <div>
                        <button onClick={handleCreate}>Create</button>
                    </div>
                </div>

                {/* here we get all notes created by particular  user  */}
                <div>
                    <h2 align="center">....POSTS....</h2>
                    <div className="getsection">
                        {getData.map((notes, id) => (
                            <div className="note-get" key={id}>
                                <>
                                    {editingNote == notes ?
                                        <div>
                                            <div className="note-title">
                                                <label className="label"> TITLE : - </label>
                                                <input type="text" name="title" value={userNote.title} onChange={handleChange} placeholder="Purpose of Note"></input>
                                            </div>
                                            <div className="note-area">
                                                <label className="label"> NOTE : - </label>
                                                <textarea name="note" value={userNote.note} onChange={handleChange}></textarea>
                                            </div>
                                            <div>
                                                <button  onClick={handleSave}>Save</button>
                                                <button onClick={handleCancel}>Cancel</button>
                                            </div>

                                        </div>
                                        :
                                        <>
                                            <div>
                                                <h3> Title :- {notes.title}</h3>
                                                <p className='getnote' > Note :- {notes.note}</p>
                                            </div>
                                            <div>
                                                <button onClick={() => handleEdit(notes)}>Edit</button>
                                                <button onClick={() =>handleDelete(notes._id)}>Delete</button>
                                            </div>
                                        </>
                                    }
                                </>

                            </div>
                        ))}

                    </div>
                </div>




            </section>
        </>
    )
}

export default Dashboard;