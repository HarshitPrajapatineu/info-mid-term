const [design, setDesign] = useState([])


export const Initiator = ({
    path,
    onEvent = () => { },
    data
}) => {

    useEffect(() => {
        API.get(FETCH_DASHBOARD_VIEW)
            .then((response) => {
                setDesign(response?.data?.design)
            }, (error) => {
                if (error.response?.status === 401 || error.response?.status === 403) {
                    localStorage.clear();
                    window.location.href = "/login"
                }
                
            })

    }, [])

    getViewForPath = () => {
        switch (path) {
            case "a":

                break;

            default:
                break;
        }
    }

}

