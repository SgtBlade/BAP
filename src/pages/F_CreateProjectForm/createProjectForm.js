import React, { useState } from 'react'
import { useObserver } from "mobx-react-lite";
import style from "./createProjectForm.module.css";
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageCompress from 'quill-image-compress';
Quill.register('modules/imageCompress', ImageCompress);
/*
var FontAttributor = Quill.import('attributors/class/font');
FontAttributor.whitelist = [
  'sofia', 'slabo', 'roboto', 'inconsolata', 'ubuntu'
];
Quill.register(FontAttributor, true);
*/



const CreateProjectForm = () => {
  const [value, setValue] = useState();

  function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    document.querySelector('.filesize').textContent = Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
 }

  const handleChange = (html) => {
    setValue(html);
    bytesToSize(encodeURI(html).split(/%(?:u[0-9A-F]{2})?[0-9A-F]{2}|./).length - 1)
    let test = html.split(">").join('> \n').split('</').join('\n </');
    document.querySelector('.codeDisplay').textContent = test;
    console.log(html)
  }

  const modules = {
    toolbar: [

      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
    
      [{ 'header': 1 }, { 'header': 2 }, { 'header': 3 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
    
      //[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
    
      ['clean']   

    ]
    /*toolbar: [
      [{ 'header': [1, 2, false] }],
      ['background', 'bold', 'color', 'size', 'font', 'code', 'italic', 'underline','strike', 'blockquote', 'script', 'code-block'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ]*/
    
    ,
    imageCompress: {
      quality: 0.4, // default
      maxWidth: 720, // default
      maxHeight: 405, // default
      imageType: 'image/jpeg', // default
      debug: true, // default
    }
  }

  const formats = [
    'header', 'background',
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
  ]

  return useObserver(() => (
    <div className={style.wrap}>
          <ReactQuill 
          theme={'snow'}
          onChange={handleChange}
          value={value}
          modules={modules}
          style={{maxWidth: 500}} 
          />

          <div className={`${style.codeBlok}`}>
              <p className={`filesize ${style.stringSize}`}></p>
              <code className={`codeDisplay `}> </code>
          </div>

    </div>
  ));
};

export default CreateProjectForm;