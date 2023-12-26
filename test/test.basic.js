describe ('Basic Double Linked List Tests', function () {
  it('Create a DLL', function () {
    return setGlobal('List', new lib.DList());
  });
  it('Fill in with 5 items', function () {
    var i;
    for (i=0; i<5; i++) {
      List.push(i);
    }
    return expect(List.length).to.equal(5);
  });
  it('Traverse with push', function (){
    List.traverse(function (item) {
      List.push(item+5);
    });
    expect(List.length).to.equal(10);
    expect(List.head.next.next.next.next.next.content).to.equal(5);
    expect(List.tail.prev.prev.prev.content).to.equal(6);
  });
  it('Traverse with remove 5', function () {
    List.traverse(function (content) {
      if (content==5) {
        List.remove(List.head.next.next.next.next.next);
      }
    });
    expect(List.length).to.equal(9);
    expect(List.head.next.next.next.next.next.content).to.equal(6);
    expect(List.tail.prev.prev.prev.content).to.equal(6);
  });
  it('Traverse with remove 0', function () {
    var ninefound = false;
    List.traverse(function (content) {
      if (content==9) {
        ninefound = true;
      }
      if (content==0) {
        List.remove(List.head);
      }
    });
    expect(ninefound).to.equal(true);
    expect(List.length).to.equal(8);
    expect(List.head.content).to.equal(1);
    expect(List.tail.prev.prev.prev.content).to.equal(6);
  });
  it('Destroy DDL', function () {
    List.destroy();
  });
});