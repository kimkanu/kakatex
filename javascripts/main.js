var executing = false;

async function renderToImage() {
  if (executing) return;

  executing = true;
  document.getElementById('contents').style.overflowY = 'hidden';
  document.getElementById('kakao-link-btn').classList.add('exec');
  var resizers = document.querySelector('.resizers');
  var base64Image = (await domtoimage.toPng(resizers)).slice(22);
  document.getElementById('contents').style.overflowY = 'auto';

  var formData = new FormData();
  formData.append('image', base64Image);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://api.imgur.com/3/image.json');
  xhr.onload = () => {
    var { link } = JSON.parse(xhr.responseText).data;
    sendLink(link);
  };
  xhr.setRequestHeader('Authorization', 'Client-ID 7e06dc2fe0a78bb');
  xhr.send(formData);
}

Kakao.init('034571a3977ef37e7fe58a5ac340e38c');
function sendLink(imageUrl) {
  Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: '',
      description: '',
      imageUrl,
      link: {
        mobileWebUrl: imageUrl,
        webUrl: imageUrl
      }
    },
    buttons: [
      {
        title: '자세히 보기',
        link: {
          mobileWebUrl: imageUrl,
          webUrl: imageUrl
        }
      }
    ]
  });
  executing = false;
  document.getElementById('kakao-link-btn').classList.remove('exec');
}

function toggleDark() {
  if (document.body.classList.contains('dark')) {
    document.body.classList.remove('dark');
    editor.setTheme('ace/theme/tomorrow');
  } else {
    document.body.classList.add('dark');
    editor.setTheme('ace/theme/tomorrow_night_eighties');
  }
}
