/*
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-11-09 16:29:06
 * @LastEditTime: 2023-11-09 16:32:17
 * @LastEditors: breeze1307
 */
if (!/pnpm/.test(process.env.npm_execpath || '')) {
  console.warn(
    `\u001b[33mThis repository must using pnpm as the package manager ` +
      ` for scripts to work properly.\u001b[39m\n`,
  )
  process.exit(1)
}
