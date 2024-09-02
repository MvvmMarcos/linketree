import {ReactNode} from 'react';
import { Link } from "react-router-dom"

interface SocialProps{
    url:string;
    children:ReactNode;
}

const Social = ({url, children}:SocialProps) => {
  return (
    <Link to={url} rel="noopener noreferrer" target='_blank'>
        {children}
    </Link>
  )
}

export default Social