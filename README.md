## To Run Nodus:
1. Install Termux from playstore
## On Termux run commands
 ```bash
 termux-setup-storage
``` 
 ```bash
 pkg update && pkg upgrade && pkg install git nodejs
 ```
 ```
 bash git clone https://github.com/KhushOS-hub/Nodus.git nodus
```
 ```bash
   cd nodus
   db:migrate
   npm run dev
   ```
7. Copy the Network and Pair Code

## On Computer 
Run:

```bash
git clone --filter=blob:none --no-checkout https://github.com/KhushOS-hub/Nodus.git && cd Nodus && git sparse-checkout init --cone && git sparse-checkout set cli && git checkout
```
## initialise cli
```bash
 cd cli
 bun install
 bun run index.ts init
```
Paste the network and pair code
## Operations on cli
```bash
 bun run index.ts mkdir 
```
```bash
bun run index.ts file upload
``` 

## File path on android
1. open file manager
2. search Nodus, inside it every folder and file will be present.
--
   Happy Coding :>>

