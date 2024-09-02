import { FormEvent, useState, useEffect } from 'react';
import {FiTrash2} from 'react-icons/fi';
//components
import Header from '../../compontents/Header/Header';
import Input from '../../compontents/Input/Input';
//firebase
import { db } from '../../services/firebaseConnection';
import {addDoc, collection, onSnapshot, query, orderBy, doc, deleteDoc} from 'firebase/firestore';
//interface
interface LinkProps{
  id:string;
  name:string;
  url:string;
  bg:string;
  color:string;
}
const Admin = () => {
  const [nameInput, setNameInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [textColorInput, setTextColorInput] = useState('#f1f1f1');
  const [backgorundColorInput, setBackgroundColorInput] = useState('#121212');
  const [links, setLinks] = useState<LinkProps[]>([]);
  useEffect(()=>{
    const linksRef = collection(db, 'links');
    const queryRef = query(linksRef, orderBy('created','asc'));

    const unsub = onSnapshot(queryRef,(snapshot)=>{
      let lista = [] as LinkProps[];
      snapshot.forEach((doc)=>{
        lista.push({
          id:doc.id,
          name:doc.data().name,
          url:doc.data().url,
          bg:doc.data().bg,
          color:doc.data().color
        })
      })
      setLinks(lista);
    })
    return ()=>{
      unsub();
    }
  },[])
  function handleRegister(e:FormEvent) {
    e.preventDefault();
    if(nameInput === '' || urlInput === ''){
      alert('Preencha todos os campos!');
      return;
    }
    addDoc(collection(db, 'links'),{
      name:nameInput,
      url:urlInput,
      bg:backgorundColorInput,
      color:textColorInput,
      created: new Date()
    })
    .then(()=>{
      console.log('Cadastrado com sucesso');
      setNameInput('');
      setUrlInput('');      
    }).catch((error)=>{
      console.log('Erro ao cadastrar no banco: ', error)
    })

  }
  async function handleDeleteLink(id:string){
    const docRef = doc(db,'links', id);
    await deleteDoc(docRef);
  }

  console.log(textColorInput);
  return (
    <div className='flex items-center py-4 flex-col min-h-screen pb-7 px-2'>
      <Header />
      <form onSubmit={handleRegister}
      className='flex flex-col mt-8 mb-3 w-full max-w-xl'>
        <label className='text-white font-medium mt-2 mb-2'>Nome do link</label>
        <Input
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder='Digite o nome do link...' />

        <label className='text-white font-medium mt-2 mb-2'>URL do link</label>
        <Input
          type='url'
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder='Digite a URL...' />

        <section className='flex my-4 gap-5 items-center'>

          <div className='flex gap-2 items-center'>
            <label className='text-white font-medium mt-2 mb-2'>Cor do link</label>
            <input type="color"
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>
          <div className='flex gap-2 items-center'>
            <label className='text-white font-medium mt-2 mb-2'>Fundo do link</label>
            <input type="color"
              value={backgorundColorInput}
              onChange={(e) => setBackgroundColorInput(e.target.value)}
            />
          </div>

        </section>
{/* START preview */}
        {nameInput && (
          <div className='flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md'>
          <label className='text-white font-medium mt-2 mb-2'>Veja como está fincando</label>
          <article
            className='w-11/12 max-w-lg flex fle-col items-center justify-center bg-zinc-900 rounded px-1 py-3'
            style={{ marginBottom: 8, marginTop: 8, background: backgorundColorInput }}
          >
            <p className='font-medium'
              style={{ color: textColorInput }}
            >{nameInput}</p>
          </article>
        </div>
        )}
{/* END preview */}
        <button type='submit' className='mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center'>
          Cadastrar
        </button>
      </form>

      <h2 className='font-bold text-white mb-4 text-xl'>Meus links</h2>

      {/* START MEUS LINKS  */}
      {links && links.map((link)=>(
        <article key={link.id}
        className='flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none font-bold'
        style={{background:link.bg, color:link.color}}
  
        >
          <p>{link.name}</p>
          <button onClick={()=>handleDeleteLink(link.id)}
          className='border border-dashed py-1 bg-neutral-700 p-1 rounded'>
          <FiTrash2 size={20} color='#fff'/>
          </button>
        </article>
      ))}
      
      {/* END MEUS LINKS  */}
    </div>
  )
}

export default Admin