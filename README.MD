## 사용 기술
- Django
- Tailwind css
- Javascript

## 기능
- todo 목록조회
- 태그, 내용, 완료 여부에 따른 조건별 검색
- 완료 여부 toggle 기능
- 메인화면에서 todo 생성 삭제 수정
- tag 생성 수정 삭제 
- tag 색상 설정


## 필수 설치 항목
- pipenv
- python version 3.9 (pipfile 에서 python version 변경 가능)

## 실행 방법
```
$ git clone https://github.com/sudalking94/todo-subject # Reposiory 복사
$ cd todo-subject                                       # 설치한 폴더로 이동
$ pipenv sync                                           # 가상환경 dependency 설치
$ pipenv shell                                          # 가상환경 실행
# root directory에서 .env 파일 SECRET_KEY 값 설정
$ python manage.py runserver                            # 서버실행
```


## 개발을 진행하면서...
가장 어려웠던 부분은 django 서버에서 csrf token missing 에러였습니다.   
이 에러는 form 형식의 데이터가 아닌 form이 없는 input 이나 textarea 같은 값을 장고 서버로 전송시 발생 하였습니다.   
장고 서버에서 csrf token을 무시하여 받을 수 있도록 설정할 수도 있지만 이러한 방법은 향후 개발시 보안상 문제가 될 수도 있을것 같아 더 찾아 보았습니다.   
csrf token missing 에러를 해결하기 위해 가장 먼저 stackoverflow를 찾아 보았고 답변들을 하나씩 정독하며 장고 docs도 찾아 보았습니다.   
몇 시간의 검색 끝에 해결 책은 javascript에서 csrf token cookie를 생성해주는 코드를 작성후 
이 쿠키를 httprequest 요청시 header에 csrf token을 담아서 보내면 되는 아주 간단한 문제였습니다.   
이를 통해 공식 docs의 중요성을 재확인하게 되었습니다.   
    소규모 프로젝트 였지만 git-flow-brnach 전략을 처음 사용하면서 git을 더 효율적으로 사용하는 방법을 알게되는 좋은 시간이었습니다.   
이 전까지는 마스터 브랜치에 전부 커밋을 하는 형태로 개발을 해왔었지만 프로젝트 규모가 더 커진다면 git flow branch 전략은 아주 효율적일 것이라는 생각이 들었습니다.