import { FormEvent, useState, useEffect } from 'react';
//components
import Header from '../../compontents/Header/Header';
import Input from '../../compontents/Input/Input';
//firebase
import { db } from '../../services/firebaseConnection';
import {setDoc, doc, getDoc} from 'firebase/firestore';
const Networks = () => {
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [youtube, setYoutube] = useState('');
  const [linkedIn, setLinkedIn] = useState('');

  useEffect(()=>{
    function loadLinks(){
      const docRef = doc(db,'social','link');
      getDoc(docRef)
      .then((snapshot)=>{
        if(snapshot.data() !== undefined){
          setFacebook(snapshot.data()?.facebook);
          setInstagram(snapshot.data()?.instagram);
          setYoutube(snapshot.data()?.youtube);
          setLinkedIn(snapshot.data()?.linkedIn);
        }
      })
    }
    loadLinks();
  },[])
  function handleSubmit(e:FormEvent){
    e.preventDefault();

    setDoc(doc(db,'social','link'),{
      facebook:facebook,
      instagram:instagram,
      youtube:youtube,
      linkedIn:linkedIn
    })
    .then(()=>{
      console.log('Cadastrado com sucesso!');
    })
    .catch((error)=>{
      console.log('Erro ao cadastrar: ' + error);
    })
  }
  return (
    <div className="flex flex-col min-h-screen pb-7 px-2 py-4 items-center">
      <Header/>
        <h1 className='text-white text-2xl font-medium mt-8 mb-4'>Minhas redes sociais</h1>
        <form onSubmit={handleSubmit} className='flex flex-col max-w-xl w-full'>
          <label className='text-white font-medium mb-2 mt-2'>Link do facebook</label>
          <Input
          value={facebook}
          onChange={(e)=>setFacebook(e.target.value)}
          type='url'
          placeholder='Digite a url do facebook'
          />
          <label className='text-white font-medium mb-2 mt-2'>Link do instagram</label>
          <Input
          value={instagram}
          onChange={(e)=>setInstagram(e.target.value)}
          type='url'
          placeholder='Digite a url do instagram'
          />
          <label className='text-white font-medium mb-2 mt-2'>Link do youtube</label>
          <Input
          value={youtube}
          onChange={(e)=>setYoutube(e.target.value)}
          type='url'
          placeholder='Digite a url do youtube'
          />
          <label className='text-white font-medium mb-2 mt-2'>Link do linkedIn</label>
          <Input
          value={linkedIn}
          onChange={(e)=>setLinkedIn(e.target.value)}
          type='url'
          placeholder='Digite a url do linkedn'
          />
          <button type='submit' className='text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 font-medium'>Salvar links</button>
        </form>
    </div>
  )
}

export default Networks