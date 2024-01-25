import React, { useEffect } from "react"
import { Environment } from "./createParticales"
import * as THREE from "three"
import { Font, FontLoader } from "three/examples/jsm/loaders/FontLoader"
import Script from "next/script"

export default function AnimatedText() {
  useEffect(() => {
    const preload = () => {
      const manager = new THREE.LoadingManager()
      const particle = new THREE.TextureLoader(manager).load("https://res.cloudinary.com/dfvtkoboz/image/upload/v1605013866/particle_a64uzf.png")

      var typo: Font | null = null
      const loader = new FontLoader(manager)
      loader.load("https://res.cloudinary.com/dydre7amr/raw/upload/v1612950355/font_zsd4dr.json", function (font) {
        typo = font
      })
      manager.onLoad = function () {
        const environment = new Environment(typo!, particle)
      }
    }
    preload()
  }, [])

  return (
    <>
      <Script type="x-shader/x-vertex" id="vertexshader">
        {`
        attribute float size;
        attribute vec3 customColor;
        varying vec3 vColor;

        void main() {

            vColor = customColor;
            vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
            gl_PointSize = size * ( 300.0 / -mvPosition.z );
            gl_Position = projectionMatrix * mvPosition;
        }
        `}
      </Script>
      <Script type="x-shader/x-fragment" id="fragmentshader">
        {`

 uniform vec3 color;
 uniform sampler2D pointTexture;

 varying vec3 vColor;

 void main() {

   gl_FragColor = vec4( color * vColor, 1.0 );
   gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );

 }
 `}
      </Script>
      <div className="w-screen h-screen block top-0 left-0 z-0" id="three-intro"></div>
    </>
  )
}
