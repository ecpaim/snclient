// red: #992e2e
const t = {
    //shadows: ["none"],
    palette: {
      primary: {
        light: '#ced3db', // gray
        main: '#ffffff', // white
        dark: '#bebebe', // gray
        contrastText: '#000000' // black
      },
      secondary: {
        //light: '#e40000', // light red
        light:'#6202f3', // light purple
        //main: '#992e2e', // main red
        main: '#512f83', // main purple
        dark: '#000000',
        contrastText: '#ffffff'
      },
    },
    general: {
        visibleSeparator: {
            width: '100%',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            marginBottom: 5
        },
        grow: { //pushes itens to the right
          flexGrow: 1,
        },
    }
};
export default t;