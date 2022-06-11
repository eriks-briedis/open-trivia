import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useCallback, useEffect, useState } from "react"
import { Category } from "../../model";
import { Api } from "../../utils";
import { SelectMenu } from "../SelectMenu";

export interface GameOptions {
  category: number;
  difficulty: string;
  amount: number;
}

export interface SettingsProps {
  onStartGame: (options: GameOptions) => void;
}

export const Settings: React.FC<SettingsProps> = ({ onStartGame }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | string>('');
  const [difficulty, setDifficulty] = useState<string>('easy');
  const [amount, setAmount] = useState<number>(10);

  const initCategories = async () => {
    const api = new Api();
    const response = await api.getCategories();

    setCategories(response.trivia_categories);
  }

  const startGame = useCallback(() => {
    onStartGame({
      category: activeCategory as number,
      difficulty,
      amount,
    });
  }, [activeCategory, difficulty, amount, onStartGame])

  useEffect(() => {
    initCategories();
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '25px auto' }}>
      <h1 style={{ textAlign: 'center' }}>Customize your game</h1>
      <SelectMenu<number | string>
        label="Select a Category"
        onSelect={setActiveCategory}
        value={activeCategory}
      >
        {!!categories?.length && categories.map((category, i) => (
          <MenuItem key={i} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </SelectMenu>

      <SelectMenu<string>
        label="Select Difficulty"
        onSelect={setDifficulty}
        value={difficulty}>
        <MenuItem value="easy">Easy</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="hard">Hard</MenuItem>
      </SelectMenu>

      <TextField
        type="number"
        defaultValue={10}
        fullWidth
        onChange={({ target }) => setAmount(parseInt(target.value))}
        sx={{ marginBottom: '25px' }}
      />
      <div style={{ textAlign: 'center' }}>
      <Button variant="contained" disabled={!activeCategory} onClick={startGame}>
        Go!
      </Button>
      </div>
    </div>
  )
}
