const path = require('path');

module.exports = {
  webpack: (config, env) => {
    config.resolve.extensions.push('.ts', '.tsx'); // Adiciona a extensão .ts e .tsx
    return config;
  },
};
