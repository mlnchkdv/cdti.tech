import { useEffect, useRef, useState } from 'react';

interface AsciiBackgroundProps {
  offsetTop?: number;
  height?: number;
  offsetLeft?: number;
  scatterRange?: number;
  isFixed?: boolean;
}

const AsciiBackground = ({ 
  offsetTop = 0, 
  height = 800,
  offsetLeft = 0,
  scatterRange= 1.5,
isFixed = false,
}: AsciiBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  // 🔑 Только проверяем размер, не блокируем рендеринг
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Устанавливаем начальное значение
    checkMobile();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 🔑 Запускаем анимацию только если не мобильное
  useEffect(() => {
    // Не запускаем, если ещё не знаем размер или это мобильное
    if (isMobile === null || isMobile) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const asciiArt = ` ###                                                                                                           ### 
######                                                                                                       ######
########                                                                                                   ########
##########                                                                                               ##########
############                                                                                           ############
##############                                                                                      ###############
 ###############                                                                                  ################ 
  ################                                                                              #################  
    #################                                                                         #################    
      #################                                                                     #################      
        #################                                                                 #################        
     ######################                                                             ######################     
     ########################                                                         ########################     
     ##########################                                                     ##########################     
      ###########################                                                 ###########################      
       ############################                                             ############################       
        #############################                                         #############################        
          ############################                                       ############################          
        ###############################                                     ###############################        
        ###############################                                     ###############################        
        ##############################                                      ###############################        
         ############################           ###################          #############################         
           #########################        ###########################        #########################           
             ######################      ################################       #####################              
             ####################      #####################################      ####################             
             ###################     #########################################     ###################             
             ###################   #############################################   ###################             
              ################## ################################################# ##################              
                ###################################################################################                
                   #############################################################################                   
                           #############################################################                           
                         #################################################################                         
                       #####################################################################                       
                     #########################################################################                     
                    ###########################################################################                    
                    ###########################################################################                    
                     #########################################################################                     
                                                                                                                   
                                                                                                                   
                                                    ##########                                                     
                                  ####              ###########              ###                                   
                             ##############         ###########         ##############                             
                           ##################       ###########       ##################                           
                         #####################      ###########      #####################                         
                        ######################      ###########     #######################                        
                       ###########       #####      ###########      #####       ###########                       
                       ##########                   ###########                   ##########                       
                      ##########                    ###########                    #########                       
                      ##########                    ###########                    ##########                      
                      ##########                    ###########                   ###########                      
                      ###########                   ###########                   ##########                       
                       ###########                  ###########                  ###########                       
                       ############                 ###########                #############                       
                        ##############              ###########              ##############                        
                         ###############            ###########            ###############                         
                          #################         ###########        ##################                          
                            ##################      ###########      ##################                            
                              ####################   ########    ####################                              
                                ######################   #   #####################                                 
                                   ######################   ####################                                   
                                      #######################  ##############                                      
                                         ######################   ########                                         
                                             #####################   #                                             
                                                 ####################                                              
                                           #######   ###################                                           
                                         ############   ##################                                         
                                       ################    #################                                       
                                     ###############   #####   ##############                                      
                                    #############    #########    #############                                    
                                   ###########       #########      ############                                   
                                  ###########        #########        ##########                                   
                                  #########          #########         ##########                                  
                                 #########           #########          #########                                  
                                 #########           #########           ########                                  
                                 #########           #########           ########                                  
                                  ########           ########            ########                                  
                                  #########          ########           #########                                  
                                   ##########        ########         ##########                                   
                                   ###########       ########       ###########                                    
                                     ############    ########     ############                                     
                                      #############   ######    ############                                       
                                         ##############     ##############                                         
                                           ################  ###########                                           
                                              ################  #####                                              
                                                  ###############                                                  
                                               ###    ##############                                               
                                             #########    ###########                                              
                                           ##########    #    #########                                            
                                          ########    #######    ########                                          
                                         #######      #######      #######                                         
                                         #####        #######       ######                                         
                                        ######        #######        ######                                        
                                        #####         #######         #####                                        
                                        #####         ######          #####                                        
                                        #####         ######          #####                                        
                                         ####         ######          ####                                         
                                         #####        ######         #####                                         
                                          #####        #####        #####                                          
                                           ####        #####        ####                                           
                                             ##        #####        ##                                             
                                                       #####                                                       
                                                       #####                                                       `;

    ; // твой ASCII арт
    const asciiArtMini = `###                                                                ###
#####                                                            #####
#######                                                        #######
#########                                                    #########
 *#########                                                ########## 
   ##########                                            ##########   
     ##########                                       ###########     
   ##############                                   *##############   
   ################                               #################   
    ##################                          ##################    
      #################                        #################      
     ###################                      ###################     
     ##################                        ##################     
      ################     ##############*      ################      
         ############    ####################    ###########          
        ###########    ########################   ############        
         ########## #############################  ##########         
          ##################################################          
                ######################################                
               ########################################               
             ############################################             
            ##############################################            
             *###########################################             
                                                                      
                               ########                               
                 ##########    ########    ##########                 
               #############   #######    #############               
              #######   ####   #######    ###*  ########              
              #####*           *######            ######              
             ######             ######             ######             
             #######            ######            ######              
              #######           ######           #######              
              #########         ######         ########*              
                ##########      ######      ##########                
                 ############   ######   ############                 
                    ############      ############                    
                      ##############  ##########                      
                          #############  ###                          
                             #############                            
                         ######  ###########                          
                        #########   ##########                        
                      ########  ######  #######*                      
                     #######    ######    #######                     
                     #####      ######     ######                     
                    ######      ######      #####                     
                    ######      #####       #####                     
                     #####       ####       #####                     
                     *######     ####     ######                      
                       #######   ####   #######                       
                         ########    ########                         
                           ########## #####                           
                               #########                              
                            #####  #######                            
                          *####  ####  #####                          
                         ####    ###*    ####                         
                        ###*     ###*     ###                         
                        *##      ###*      ###                        
                        ###      ####     ###                         
                         ###     *###     ###                         
                          ###    *###    ###                          
                           ##     ###    #                            
                                  ###                                 `

    const config = {
      particleGap: 2,
      friction: 0.968,
      ease: 0.02,
      mouseRadius: 190,
      particleColor: '#00063eff',
      particleSize: 0.8,
      scatterRange: scatterRange,
      breathSpeed: 100,
      pushForce: 0.515
    };

    let particleArray: any[] = [];
    let mouse = { x: null as number | null, y: null as number | null };
    let animationCounter = 0;
    let animationFrameId: number;

    const getContainerOffset = () => {
      const rect = container.getBoundingClientRect();
      return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
        width: rect.width,
        height: rect.height
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const offset = getContainerOffset();
      
      const x = e.clientX - offset.left + window.scrollX;
      const y = e.clientY - offset.top + window.scrollY;
      
      if (x >= 0 && x <= offset.width && y >= 0 && y <= offset.height) {
        mouse.x = x;
        mouse.y = y;
      } else {
        mouse.x = null;
        mouse.y = null;
      }
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    class Particle {
      originX: number;
      originY: number;
      x: number;
      y: number;
      vx: number = 0;
      vy: number = 0;
      size: number;

      constructor(x: number, y: number) {
        this.originX = x;
        this.originY = y;
        this.x = x + (Math.random() - 0.5) * 1;
        this.y = y + (Math.random() - 0.5) * 1;
        this.size = config.particleSize;
      }

      draw() {
        ctx.fillStyle = config.particleColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        const breathOffset = Math.sin(animationCounter / config.breathSpeed) * config.scatterRange;

        let targetX = this.originX + breathOffset;
        let targetY = this.originY + breathOffset;

        let dx = targetX - this.x;
        let dy = targetY - this.y;

        this.vx += dx * config.ease;
        this.vy += dy * config.ease;

        if (mouse.x !== null && mouse.y !== null) {
          let dxMouse = mouse.x - this.x;
          let dyMouse = mouse.y - this.y;
          let distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distMouse < config.mouseRadius) {
            const force = (config.mouseRadius - distMouse) / config.mouseRadius;
            const angle = Math.atan2(dyMouse, dxMouse);

            this.vx -= Math.cos(angle) * force * config.pushForce;
            this.vy -= Math.sin(angle) * force * config.pushForce;
          }
        }

        this.vx *= config.friction;
        this.vy *= config.friction;

        this.x += this.vx;
        this.y += this.vy;
      }
    }

    const init = () => {
      particleArray = [];
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;

      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;

      const fontSize = Math.max(7, Math.min(10, window.innerWidth * 0.007));

      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;

      tempCtx.font = `${fontSize}px 'Courier New', monospace`;
      tempCtx.fillStyle = 'white';
      tempCtx.textAlign = 'left';
      tempCtx.textBaseline = 'top';

      const lines = asciiArt.split('\n');
      const lineHeight = fontSize * 1.0;
      const startY = (canvas.height - lines.length * lineHeight) / 2;
      const startX = (canvas.width - 600) / 2;

      lines.forEach((line, i) => {
        tempCtx.fillText(line, startX, startY + i * lineHeight);
      });

      const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] > 200) {
          const pixelIndex = i / 4;
          const x = pixelIndex % tempCanvas.width;
          const y = Math.floor(pixelIndex / tempCanvas.width);

          if ((x % config.particleGap === 0) && (y % config.particleGap === 0)) {
            particleArray.push(new Particle(x, y));
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
      }

      animationCounter++;
      animationFrameId = requestAnimationFrame(animate);
    };

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('resize', handleResize);

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('resize', handleResize);
    };
  }, [height, offsetLeft, isMobile]); // 🔑 Добавили isMobile в зависимости

  // 🔑 Скрываем на мобильных через CSS, а не через null
  if (isMobile === true) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: isFixed ? 'fixed' : 'absolute',  // 🔑 Условное позиционирование
        top: isFixed ? 0 : offsetTop,
        left: isFixed ? 0 : offsetLeft,
        width: isFixed ? '100vw' : '100%',
        height: isFixed ? '100vh' : `${height}px`,
        pointerEvents: 'none',
        zIndex: isFixed ? -1 : 5,
        overflow: isFixed ? 'hidden' : 'visible',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default AsciiBackground;