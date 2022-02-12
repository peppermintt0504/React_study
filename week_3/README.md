<h1>⚓항해 99 React 심화주차 ⚓</h1>

react의 개념을 정리하기 위한 마지막 과제입니다. 

<h2>🏁 Goal:  "로그인 사용자용 매거진 사이트 만들기"</h2>

<aside>
✅ 기능 목록

</aside>

1. 게시글 
    1. 목록 가져오기
    2. 추가하기 (+이미지 업로드하기)
    3. 삭제하기 
    4. 수정하기
2. 좋아요
    1. 게시글에 좋아요하기
    2. 게시글에 좋아요 취소하기
3. 회원가입하기
4. 로그인하기  
5. 파이어베이스 or S3로 배포!

<aside>
✅ 페이지별 상세페이지별 상세

</aside>

1. 회원가입 페이지
    1. 이메일 형식 체크, 비밀번호 체크할 것
2. 로그인 페이지
    1. 이메일, 패스워드 미기입 시 로그인 버튼 활성화 막을 것
3. 메인 페이지(게시글 목록 페이지)
    1. 게시글 목록 노출
    2. 게시글 하나는 작성자, 작성 시간, 이미지 미리보기, 텍스트 내용으로 구성
    3. 게시글 하나를 클릭 시, 게시글 상세 페이지로 이동
    4. 무한 스크롤
    5. 게시글 중 좋아요버튼(분홍색 하트 버튼)을 누르면 [좋아요]를 +1한다. 다시 누르면 분홍색 하트가 회색 하트가 되고 좋아요가 -1개 된다.
4. 글 작성 페이지
    1. 레이아웃 선택 버튼
        1. 3가지 레이아웃 중 선택하도록 한다.
            - 이미지가 오른편에, 텍스트는 왼편에 위치한 레이아웃
            - 이미지가 왼편에, 텍스트는 오른편에 위치한 레이아웃
            - 텍스트가 위에, 이미지는 아래에 위치한 레이아웃
        2. 레이아웃 선택 시, 게시글 레이아웃(모양새)대로 보이도록 한다.
        3. **텍스트, 이미지 중 입력 안된 게 있다면 게시글 작성 버튼 비활성화**
        4. 작성 완료 시 메인 페이지로 이동
5. 게시글 상세 페이지
    1. 게시글 레이아웃에 맞춰 이미지, 텍스트 위치 조절해서 노출
6. 알림 기능 만들기 (+알림페이지도 추가할 것!)
<br/><br/><br/>
<h2>
🚩 완성 프로젝트 모습
</h2>
배포 URL : http://likestaram.s3-website.ap-northeast-2.amazonaws.com/
<br/>
<h3>메인 화면</h3>
<img src="https://user-images.githubusercontent.com/73277351/153709242-4b5690de-93d5-4465-b5ab-28bbdbc03966.png"/>
<br/>
<h3>로그인 화면</h3>
<img src="https://user-images.githubusercontent.com/73277351/153709332-98bab112-2fb1-4ca8-b0cd-dcf235302d55.png"/>
<br/>
<h3>회원가입 화면</h3>
<img src="https://user-images.githubusercontent.com/73277351/153709375-a6c14606-c644-4085-983d-3bbae9f44c15.png"/><br/>
<h3>글 작성 화면</h3>
<img src="https://user-images.githubusercontent.com/73277351/153709459-846b8e57-3ea1-4acd-9c1b-02aa12cf4c28.png"/><br/>
<br/>
<h3>글 작성 후 게시된 메인 화면 (본인 게시물은 수정 및 삭제 가능)</h3>
<img src="https://user-images.githubusercontent.com/73277351/153709502-ea74e0df-0225-4ad3-bd8e-7c811cf56d65.png"/>
<br/>
<h3>게시물 상세 페이지</h3>
<img src="https://user-images.githubusercontent.com/73277351/153709523-9e89f22d-ab60-4bbc-94b3-78ba1ae47c49.png"/>
<br/>
<h3>댓글 작성(다른 아이디)</h3>
<img src="https://user-images.githubusercontent.com/73277351/153709560-c3e2f0e1-c427-4d0c-a5bf-1a3be834850d.png"/>
<img src="https://user-images.githubusercontent.com/73277351/153709571-efa6e9b2-9fb9-4e02-860c-2f6c2b91b789.png"/>
<br/>
<h3>댓글에 대한 알람</h3>
<img src="https://user-images.githubusercontent.com/73277351/153709596-ae5cc639-ff01-4865-9a1c-1b50ca8cefb7.png"/>
<img src="https://user-images.githubusercontent.com/73277351/153709611-2836e103-41ce-40fe-895c-1aed88b73e6a.png"/>

<br/>
<h3>좋아요 기능</h3>
<img src="https://user-images.githubusercontent.com/73277351/153709634-a3dda35f-df51-44c9-94c3-e16aa5f80d92.png"/>
<img src="https://user-images.githubusercontent.com/73277351/153709640-99b19fdf-aab3-4cc4-a0ad-04b4d130da1f.png"/>



