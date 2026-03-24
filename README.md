# dec2bin
decimal value within range -128 to 127 convert to 8bit binary (bit7 signed bit, bit6-0 binary figure)

## 运行方式

### WSL + Windows 浏览器访问

1. **在 WSL 中启动 HTTP 服务器**
   ```bash
   python3 -m http.server 8000
   ```

2. **在 Windows 浏览器中访问**
   ```
   http://172.26.39.129:8000
   ```

3. **其他启动方式**
   ```bash
   # 使用 PHP 服务器
   php -S 0.0.0.0:8000
   ```

4. **直接打开文件**
   双击 `index.html` 文件在浏览器中直接打开