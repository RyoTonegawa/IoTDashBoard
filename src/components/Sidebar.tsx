"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ChevronsLeft, MapIcon, MenuIcon, TriangleAlert } from "lucide-react";
import { ElementRef, useEffect, useRef, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery"
export default function Sidebar() {
  const pathname = usePathname();
  // サイドバーの開閉に関する実装。ここを優先して理解
  // useRefはコンポーネントが再レンダーされても値を保持し続けられる
  // 参照オブジェクト
  // 今回はデバイスに合わせてDOMを操作するためにdivとasideを操作する
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navBarRef = useRef<ElementRef<"div">>(null);
  const [isCollapsed,setIsCollapsed] = useState(false);
  const [isResetting,setIsResetting] = useState(false);
  const collapse = ()=>{
    if(sidebarRef.current && navBarRef.current
    ){
      // たたまれていると宣言
      setIsCollapsed(true);
      // アニメーションで使う状態フラグの宣言
      setIsResetting(true);
      // DOMをいじって見た目を変える
      // サイドバーの幅をゼロに
      sidebarRef.current.style.width= "0";
      navBarRef.current.style.setProperty("width","100%");
      // メインのページをleftを０にして画面いっぱい表示する
      navBarRef.current.style.setProperty("left","0");
      // 0.3sでたたむ。
      // ０.３の間は表示せずに連打ができないようにするフラグ
      setTimeout(()=>{
        setIsResetting(false);
      },300);
    }
  }
  const resetWidth=()=>{
    // どちらもレンダリングされてMountされたらという判定文
    if(sidebarRef.current && navBarRef.current){
      setIsCollapsed(false);
      // アニメーション終了まではTrue
      setIsResetting(true);
      sidebarRef.current.style.width = isMobile ?"100%":"240px";
      navBarRef.current.style.setProperty(
        "width",
        isMobile ? "0":"calc(100%-240px)"
      );
      navBarRef.current.style.setProperty("left",isMobile?"100%":"240px");
      setTimeout(()=>{
        setIsResetting(false);
      },300);
    }
  }
  const isMobile = useMediaQuery("(max-width:768px)")
  useEffect(()=>{
    if(isMobile){
      collapse();
    }else{
      resetWidth();
    }
  },[isMobile])
  useEffect(()=>{
    if(isMobile){
      collapse()
    }
  },[pathname])

// サイドバーの影に関する実装
  const isResizingRef = useRef(false);
  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;
    // 最大最小の幅の制限
    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navBarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navBarRef.current.style.setProperty("left", `${newWidth}px`);
      navBarRef.current.style.setProperty("width", `calc(100%-${newWidth}px)`);
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const links = [
    { href: "/alerts", label: "Alerts", icon: TriangleAlert },
    { href: "/areas",  label: "Areas",  icon: MapIcon },
  ];

  return (
    <>
    <aside
      ref={sidebarRef}

    className={cn(
      "group/sidebar border-r space-y-4 h-full bg-secondary overflow-auto relative flex w-60 flex-col z-[99999]",
      isResetting && "transition-all ease-in-out duration-300",
      isMobile && "w-0"
    )}
    style = {{height:"100vh"}}
    >
      {/* 折りたたみのシェブロン */}
      <div
          onClick={collapse}
          role="button"
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
      <h1 className="font-bold text-xl mb-4 px-3">LOGO</h1>

      {/* Radix の素 Separator を使う場合 */}
      <Separator/>
      <nav className="space-y-2">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md",
                // 通常はテキストだけ。枠は透過にしてレイアウトズレ防止
                "text-muted-foreground border border-transparent",
                // hover でうっすら枠線
                "hover:border-border",
                // アクティブ時は背景と文字色を強調
                active && "bg-primary/10 text-foreground text-green-600"
              )}
            >
              <Icon className={cn("w-4 h-4", active && "text-foreground")} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

        {/* sidebar shadow */}
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100   transition cursor-ew-resize absolute h-full w-1 bg-primary/10   right-0 top-0"
        />
    </aside>
          <div
          ref={navBarRef}
          className={cn(
            "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
            isResetting && "transition-all ease-in-out duration-300",
            isMobile && "left-0 w-full"
          )}
        >
          <nav className="bg-transparent px-3 py-2 w-full">
            {isCollapsed && (
              <MenuIcon
                onClick={resetWidth}
                role="button"
                className="h-6 w-6 text-muted-foreground"
              />
            )}
          </nav>
        </div>

    </>
  );
}