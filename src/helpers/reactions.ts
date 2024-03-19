import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faThumbsUp, faHeart, faFaceGrinTears } from '@fortawesome/free-solid-svg-icons'
import { faFaceLaugh } from '@fortawesome/free-solid-svg-icons'

export interface IDashboardRoutes {
    name: string;
    icon: IconDefinition;
    // This can be a color name / hex / rbg or rbga
    color: string;
}

const reactionsIcons: IDashboardRoutes[] = [
    {
        name: 'heart',
        icon: faHeart,
        color: 'red'
    },
    {
        name: 'thumbup',
        icon: faThumbsUp,
        color: 'blue'
    },
    {
        name: 'facegrintears',
        icon: faFaceGrinTears,
        color: 'yellow'
    },
    {
        name: 'facelaugh',
        icon: faFaceLaugh,
        color: 'orange'
    },
]

export default reactionsIcons;