import React, {useState, useEffect} from 'react'
import { Container } from '../Components'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'




function Home() {

    const navigate = useNavigate()

  
    const navItems = [
        {
            name: "Login",
            slug: "/login",
        },
    ]
        return (
            <div className="w-full py-8 mt-4 text-center align-middle">
                <Container>
                    <div className="flex flex-wrap ">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                            <ul className='flex w-full justify-center'>
                                {navItems.map((item) => 
                                    (
                                    <li key={item.name}>
                                    <button
                                    onClick={() => navigate(item.slug)}
                                    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                                    >{item.name}</button>
                                    </li>
                                    )
                                )}
                            </ul>
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

export default Home




//     return (
//       <header className='py-3 shadow bg-gray-500'>
//         <Container>
//           <nav className='flex'>
//             <div className='mr-4'>
//               <Link to='/'>
//                 <Logo width='70px'   />
  
//                 </Link>
//             </div>
//             <ul className='flex ml-auto'>
//               {navItems.map((item) => 
//                 (
//                 <li key={item.name}>
//                   <button
//                   onClick={() => navigate(item.slug)}
//                   className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
//                   >{item.name}</button>
//                 </li>
//                 )
//               )}
//           </ul>
//         </nav>
//         </Container>
//     </header>
//   )
// }