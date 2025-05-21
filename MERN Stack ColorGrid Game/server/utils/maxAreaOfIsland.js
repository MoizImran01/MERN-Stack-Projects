export const maxAreaOfIsland = (grid, targetColor) => {
  let maxArea = 0;
  const rows = grid.length;
  const cols = grid[0].length;
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === targetColor) {
        maxArea = Math.max(maxArea, dfs(grid, i, j, targetColor));
      }
    }
  }
  
  return maxArea;
};

const dfs = (grid, i, j, targetColor) => {
  if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] !== targetColor) {
    return 0;
  }
  

  grid[i][j] = 'visited';
  
  return 1 + 
    dfs(grid, i + 1, j, targetColor) + 
    dfs(grid, i - 1, j, targetColor) + 
    dfs(grid, i, j + 1, targetColor) + 
    dfs(grid, i, j - 1, targetColor);
};
