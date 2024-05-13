import Autocomplete from "./components/autocomplete/Autocomplete";
import AutocompleteUncontrolled from "./components/autocomplete/AutocompleteUncontrolled";

function App() {
  return (
    <>
      <div>Autocomplete controlled</div>
      <Autocomplete />
      <div>Autocomplete uncontrolled</div>
      <AutocompleteUncontrolled />
    </>
  );
}

export default App;
