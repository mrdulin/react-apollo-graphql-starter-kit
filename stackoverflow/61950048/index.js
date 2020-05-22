import colors from 'colors';
import prompCreator from 'prompt-sync';

const prompt = prompCreator();

const password = prompt('Sign apk password?: ').trim();

if (!password || password.length === 0) {
  console.error(colors.bgRed.yellow(' You need a password to sign the APK '));
  process.exit(0);
}
